/**
 * Mock Socket for Static Deployment
 *
 * This module provides a mock socket implementation for static builds
 * that replaces the actual Socket.IO functionality.
 */

// Mock socket object that mimics Socket.IO interface
export const socket = {
  connected: true,
  id: "mock-socket-id",

  connect: () => {
    console.log("Mock socket: connect called");
  },

  disconnect: () => {
    console.log("Mock socket: disconnect called");
  },

  emit: (event: string, ...args: unknown[]) => {
    console.log("Mock socket emit:", event, args);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on: (event: string, _callback: (...args: unknown[]) => void) => {
    console.log("Mock socket on:", event);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  off: (event: string, _callback?: (...args: unknown[]) => void) => {
    console.log("Mock socket off:", event);
  },
};
