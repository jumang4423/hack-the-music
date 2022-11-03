// what the fuck is this class btw
class ErrStr {
  private isErr: boolean = false;
  private errStr: string = "";
  constructor({ isErr, errStr }: { isErr?: boolean; errStr?: string }) {
    if (isErr) {
      this.isErr = isErr;
      this.errStr = errStr || "Unknown Error";
    }
  }

  public IsError(): boolean {
    return this.isErr;
  }

  public GetError(): string {
    return this.errStr;
  }
}

export default ErrStr;
