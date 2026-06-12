import { createContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";

export const CustomerContext = createContext(null);

const loadCustomers = () => {
  try {
    const savedCustomers = localStorage.getItem("customers");
    return savedCustomers ? JSON.parse(savedCustomers) : [];
  } catch (error) {
    console.error("Failed to load customers from local storage", error);
    return [];
  }
};

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(() => loadCustomers());

  useEffect(() => {
    const customersCollection = collection(db, "customers");
    const unsubscribe = onSnapshot(
      customersCollection,
      (snapshot) => {
        const dbCustomers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(dbCustomers);
      },
      (error) => {
        console.error("Failed to load customers from Firestore", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("customers", JSON.stringify(customers));
    } catch (error) {
      console.error("Failed to save customers to local storage", error);
    }
  }, [customers]);

  const totalCustomers = customers.length;
  const totalBalance = customers.reduce((sum, customer) => sum + Number(customer.balance || 0), 0);

  const addCustomer = async (customer) => {
    try {
      await addDoc(collection(db, "customers"), customer);
      return true;
    } catch (error) {
      console.error("Failed to save customer to Firestore", error);
      setCustomers((prevCustomers) => [...prevCustomers, customer]);
      return false;
    }
  };

  const updateCustomerBalance = async (id, newBalance) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === id ? { ...customer, balance: Number(newBalance) } : customer
      )
    );

    try {
      const customerRef = doc(db, "customers", id);
      await updateDoc(customerRef, { balance: Number(newBalance) });
    } catch (error) {
      console.error("Failed to update customer balance in Firestore", error);
    }
  };

  const deleteCustomer = async (id) => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));

    try {
      const customerRef = doc(db, "customers", id);
      await deleteDoc(customerRef);
    } catch (error) {
      console.error("Failed to delete customer from Firestore", error);
    }
  };

  const clearAllCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const batch = writeBatch(db);
      querySnapshot.forEach((document) => batch.delete(document.ref));
      await batch.commit();
    } catch (error) {
      console.error("Failed to clear customers in Firestore", error);
      setCustomers([]);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        totalCustomers,
        totalBalance,
        addCustomer,
        updateCustomerBalance,
        deleteCustomer,
        clearAllCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
