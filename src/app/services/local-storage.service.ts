import { Inject, Injectable } from '@angular/core';

import { LOCAL_STORAGE } from './local-storage';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) {}

  hasItem(key: string): boolean {
    return this.localStorage.getItem(key) !== null;
  }

  getItem(key: string): any | null {
    const storageItem = this.localStorage.getItem(key);

    try {
      const parsedItem = JSON.parse(storageItem);

      switch (parsedItem) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return parsedItem;
      }
    } catch (e) {
      return storageItem;
    }
  }

  setItem(key: string, item: any): void {
    this.localStorage.setItem(key, JSON.stringify(item));
  }

  removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }
}
