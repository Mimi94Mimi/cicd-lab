import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app';

describe('buildApp logger default behavior', () => {
  it('keeps logger enabled when options.logger is undefined', async () => {
    const app = buildApp({ logger: undefined });

    // Regression check: undefined logger should still resolve to true.
    expect((app as any).initialConfig.logger).toBe(true);
    await app.close();
  });

  it('keeps logger disabled when options.logger is false', async () => {
    const app = buildApp({ logger: false });

    // Fastify uses a non-Pino logger object without level when logger is disabled.
    expect((app as any).log.level).toBeUndefined();
    await app.close();
  });
});
