import { Injectable, Inject, EventEmitter } from '@angular/core';
import { THEMES, ACTIVE_THEME, Theme } from './symbols';
import { CssVars } from "../auth/user.model";


@Injectable()
export class ThemeService {

  static BG_COLOR = '--background-color';
  static TEXT_COLOR = '--text-color';
  static PRIMARY_COLOR = '--primary-color';
  static ACCENT_COLOR = '--accent-color';
  static TEXT_SIZE = '--text-size';
  static LINE_SPACING = '--line-spacing';
  static FONT_FAMILY = '--font-family';

  themeChange = new EventEmitter<Theme>();

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string
  ) {
    this.updateTheme('wp', {});
  }

  getTheme(name: string) {
    const theme = this.themes.find(t => t.name === name);
    if (!theme) {
      throw new Error(`Theme not found: '${name}'`);
    }
    return theme;
  }

  getActiveTheme() {
    return this.getTheme(this.theme);
  }

  getProperty(propName: string) {
    return this.getActiveTheme().properties[propName];
  }

  setTheme(name: string) {
    this.theme = name;
    this.themeChange.emit( this.getActiveTheme());
  }

  registerTheme(theme: Theme) {
    this.themes.push(theme);
  }

  updateTheme(name: string, properties: { [key: string]: string; }) {
    const theme = this.getTheme(name);
    theme.properties = {
      ...theme.properties,
      ...properties
    };

    if (name === this.theme) {
      this.themeChange.emit(theme);
    }
  }

  loadCssVarsFromLocalStorage() {
    let properties: any = {};
    if (!!localStorage.getItem(ThemeService.BG_COLOR)) {
      properties[ThemeService.BG_COLOR] = localStorage.getItem(ThemeService.BG_COLOR);
    }
    if (!!localStorage.getItem(ThemeService.TEXT_COLOR)) {
      properties[ThemeService.TEXT_COLOR] = localStorage.getItem(ThemeService.TEXT_COLOR);
    }
    if (!!localStorage.getItem(ThemeService.PRIMARY_COLOR)) {
      properties[ThemeService.PRIMARY_COLOR] = localStorage.getItem(ThemeService.PRIMARY_COLOR);
    }
    if (!!localStorage.getItem(ThemeService.ACCENT_COLOR)) {
      properties[ThemeService.ACCENT_COLOR] = localStorage.getItem(ThemeService.ACCENT_COLOR);
    }
    if (!!localStorage.getItem(ThemeService.TEXT_SIZE)) {
      properties[ThemeService.TEXT_SIZE] = localStorage.getItem(ThemeService.TEXT_SIZE) + 'rem';
    }
    if (!!localStorage.getItem(ThemeService.LINE_SPACING)) {
      properties[ThemeService.LINE_SPACING] = localStorage.getItem(ThemeService.LINE_SPACING) + 'rem';
    }

    console.log('properties local', JSON.stringify(properties));
    this.updateTheme('wp', properties);
  }

  loadCssVarsFromUserSettings(cssVars: CssVars) {
    let properties: any = {};
    if (!!cssVars.bgColor) {
      properties[ThemeService.BG_COLOR] = cssVars.bgColor;
    }
    if (!!cssVars.textColor) {
      properties[ThemeService.TEXT_COLOR] = cssVars.textColor;
    }
    if (!!cssVars.primaryColor) {
      properties[ThemeService.PRIMARY_COLOR] = cssVars.primaryColor;
    }
    if (!!cssVars.accentColor) {
      properties[ThemeService.ACCENT_COLOR] = cssVars.accentColor;
    }
    if (!!cssVars.textSize) {
      properties[ThemeService.TEXT_SIZE] = cssVars.textSize + 'rem';
    }
    if (!!cssVars.lineSpacing) {
      properties[ThemeService.LINE_SPACING] = cssVars.lineSpacing + 'rem';
    }
    if (!!cssVars.fontFamiliy) {
      properties[ThemeService.FONT_FAMILY] = cssVars.fontFamiliy;
    }

    this.updateTheme('wp', properties);
  }
}
