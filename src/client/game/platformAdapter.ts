export type PlatformId =
  | "demo"
  | "raise-engine"
  | "stake-engine";

export type PlatformCapabilities = {
  supportsPlatformIdentity: boolean;
  supportsPlatformEvents: boolean;
  supportsRealMoney: boolean;
};

export type PlatformContext = {
  platformId: PlatformId;
  isEmbedded: boolean;
};

export type PlatformAdapter = {
  readonly platformId: PlatformId;

  getCapabilities(): PlatformCapabilities;

  initialize(): Promise<PlatformContext>;

  notifyReady(): void;

  notifyError(message: string): void;
};

/**
 * Standalone demo adapter.
 *
 * This adapter does not connect to an external platform,
 * handle accounts, or process real-money transactions.
 */
export const demoPlatformAdapter: PlatformAdapter = {
  platformId: "demo",

  getCapabilities() {
    return {
      supportsPlatformIdentity: false,
      supportsPlatformEvents: false,
      supportsRealMoney: false,
    };
  },

  async initialize() {
    return {
      platformId: "demo",
      isEmbedded: false,
    };
  },

  notifyReady() {
    // No external platform is connected in demo mode.
  },

  notifyError(message: string) {
    // Keep the error available to the calling application.
    console.error("[Lucky Reels]", message);
  },
};
      
