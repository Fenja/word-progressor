export default class Utils {

  static normalizedToday(): number {
    return Utils.normalizeDate(new Date);
  }

  static normalizeDate(date: Date): number {
    return new Date(date).getTime();
  }
}
