/** 本地自定义音乐播放器：只读取用户主动选择的音频文件，不上传文件。 */
export class MusicPlayer {
  private readonly element = new Audio();
  private objectUrl: string | null = null;
  private fileName = "";

  constructor() {
    this.element.preload = "metadata";
    this.element.addEventListener("ended", () => {
      if (!this.element.loop) this.element.currentTime = 0;
    });
  }

  async load(file: File): Promise<void> {
    if (!file.type.startsWith("audio/")) throw new Error("请选择音频文件");
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = URL.createObjectURL(file);
    this.fileName = file.name;
    this.element.src = this.objectUrl;
    this.element.currentTime = 0;
  }

  async toggle(): Promise<boolean> {
    if (!this.element.src) return false;
    if (this.element.paused) {
      await this.element.play();
    } else {
      this.element.pause();
    }
    return !this.element.paused;
  }

  setVolume(value: number): void {
    this.element.volume = Math.min(1, Math.max(0, value));
  }

  setLoop(loop: boolean): void {
    this.element.loop = loop;
  }

  get name(): string {
    return this.fileName;
  }

  get hasTrack(): boolean {
    return Boolean(this.element.src);
  }

  get playing(): boolean {
    return !this.element.paused;
  }

  dispose(): void {
    this.element.pause();
    this.element.removeAttribute("src");
    this.element.load();
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = null;
    this.fileName = "";
  }
}
