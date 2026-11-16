import React from 'react';

/**
 * Wraps React.lazy with a single automatic retry for transient mobile network
 * failures or post-deployment hash refreshes.
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(async () => {
    try {
      return await loader();
    } catch (firstError) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      try {
        return await loader();
      } catch {
        throw firstError;
      }
    }
  });
}
