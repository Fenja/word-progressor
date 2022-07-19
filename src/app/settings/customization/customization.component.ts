import { Component } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { DataStorageService } from "../../services/data-storage.service";
import { SnackbarService } from "../../services/snackbar.service";
import { TranslationService } from "../../translation/translation.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html'
})
export class CustomizationComponent {

  backgroundColor: any;
  textColor: any;
  primaryColor: any;
  secondaryColor: any;
  textSize: number;
  lineSpacing: number;

  constructor(
    private dataStorageService: DataStorageService,
    private snackBarService: SnackbarService,
    private translationService: TranslationService,
    private themeService: ThemeService,
    private userService: UserService,
    ) {
    this.backgroundColor = this.themeService.getProperty(ThemeService.BG_COLOR).trim();
    this.textColor = this.themeService.getProperty(ThemeService.TEXT_COLOR).trim();
    this.primaryColor = this.themeService.getProperty(ThemeService.PRIMARY_COLOR).trim();
    this.secondaryColor = this.themeService.getProperty(ThemeService.ACCENT_COLOR).trim();
    this.textSize = +this.themeService.getProperty(ThemeService.TEXT_SIZE);
    this.lineSpacing = +this.themeService.getProperty(ThemeService.LINE_SPACING);

    this.userService.getUser().subscribe(user => {
      if(!!user.settings?.cssVars) {
        this.backgroundColor = user.settings!.cssVars?.bgColor;
        this.textColor = user.settings!.cssVars?.textColor;
        this.primaryColor = user.settings!.cssVars?.primaryColor;
        this.secondaryColor = user.settings!.cssVars?.accentColor;
        this.textSize = +user.settings!.cssVars?.textSize;
        this.lineSpacing = +user.settings!.cssVars?.lineSpacing;
      }
    });
  }

  saveCustomization(bgColor: string, textColor: string, primary: string, accent: string, textSize: number, lineSpacing: number) {
    this.dataStorageService.saveCssVars(bgColor, textColor, primary, accent, textSize, lineSpacing);
    this.themeService.updateTheme('wp', {
      '--background-color': bgColor,
      '--text-color': textColor,
      '--primary-color': primary,
      '--accent-color': accent,
      '--text-size': textSize.toString(),
      '--line-spacing': lineSpacing.toString(),
    });

    this.snackBarService.showSnackBar(this.translationService.translate('msg_save_customization'));
  }

  resetToDefault() {
    this.backgroundColor = '#303030';
    this.primaryColor = '#673ab7';
    this.secondaryColor = '#ffc107';
    this.textColor = '#ffffff'; // TODO differ light and dark mode
    this.dataStorageService.resetCssVars();

    this.themeService.updateTheme('wp', {
      '--background-color': this.backgroundColor,
      '--text-color': this.textColor,
      '--primary-color': this.primaryColor,
      '--accent-color': this.secondaryColor,
      '--text-size': this.textSize.toString(),
      '--line-spacing': this.lineSpacing.toString(),
    });

    this.snackBarService.showSnackBar(this.translationService.translate('msg_reset_customization'));
  }
}
