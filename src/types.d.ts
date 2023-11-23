declare interface Window {
  /** Google Analysis gtag */
  gtag: (event: string, eventName: string, params?: object) => void;
  /** Google Analysis gevt */
  gevt: (eventName: string, params?: object) => void;
  /** Google Login Client */
  google: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accounts: { id: { initialize: any; prompt: any } };
  };
}
