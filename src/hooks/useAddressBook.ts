"use client";

import { useState, useEffect } from "react";

export interface SavedAddress {
  name: string;
  address: string;
}

const STORAGE_KEY = "stellar_address_book";

export const useAddressBook = () => {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAddresses(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load address book", e);
    }
  }, []);

  const saveAddress = (name: string, address: string) => {
    if (!name.trim() || !address.trim() || address.length !== 56) return false;
    
    const newAddresses = addresses.filter((a) => a.address !== address); // Prevent exact dupes
    newAddresses.push({ name, address });
    
    setAddresses(newAddresses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
    return true;
  };

  const removeAddress = (address: string) => {
    const newAddresses = addresses.filter((a) => a.address !== address);
    setAddresses(newAddresses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
  };

  return { addresses, saveAddress, removeAddress };
};
