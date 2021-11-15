export default class Utils {

  static normalizedToday(): number {
    let today = new Date();
    today.setHours(0,0,0,0);
    return Utils.normalizeDate(today);
  }

  static normalizeDate(date: Date): number {
    return new Date(date).getTime();
  }
}
