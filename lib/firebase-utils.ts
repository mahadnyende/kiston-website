import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";

// Menu Items
export interface MenuItem {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  ingredients: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const addMenuItem = async (
  item: Omit<MenuItem, "id" | "createdAt" | "updatedAt">,
) => {
  try {
    const docRef = await addDoc(collection(db, "menu"), {
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

export const getMenuItems = async (category?: string) => {
  try {
    let q = query(collection(db, "menu"), orderBy("updatedAt", "desc"));

    if (category && category !== "all") {
      q = query(
        collection(db, "menu"),
        where("category", "==", category),
        orderBy("updatedAt", "desc"),
      );
    }

    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];

    return items;
  } catch (error) {
    console.error("Error getting menu items (collection: menu):", error);
    return [];
  }
};

export const subscribeToMenuItems = (
  callback: (items: MenuItem[]) => void,
  category?: string,
) => {
  let q = query(collection(db, "menu"), orderBy("updatedAt", "desc"));

  if (category && category !== "all") {
    q = query(
      collection(db, "menu"),
      where("category", "==", category),
      orderBy("updatedAt", "desc"),
    );
  }

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MenuItem[];
      callback(items);
    },
    (error) => {
      console.error(
        "Error subscribing to menu items (collection: menu):",
        error,
      );
    },
  );
};

export const updateMenuItem = async (
  id: string,
  updates: Partial<MenuItem>,
) => {
  try {
    const docRef = doc(db, "menu", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string) => {
  try {
    await deleteDoc(doc(db, "menu", id));
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

// Bookings
export interface Booking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Date;
}

export const createBooking = async (
  booking: Omit<Booking, "id" | "status" | "createdAt">,
) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...booking,
      status: "pending",
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getBookings = async (status?: string) => {
  try {
    let q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

    if (status) {
      q = query(
        collection(db, "bookings"),
        where("status", "==", status),
        orderBy("createdAt", "desc"),
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  } catch (error) {
    console.error("Error getting bookings (collection: bookings):", error);
    throw error;
  }
};

export const subscribeToBookings = (
  callback: (bookings: Booking[]) => void,
  status?: string,
) => {
  let q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

  if (status) {
    q = query(
      collection(db, "bookings"),
      where("status", "==", status),
      orderBy("createdAt", "desc"),
    );
  }

  return onSnapshot(
    q,
    (snapshot) => {
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Booking[];
      callback(bookings);
    },
    (error) => {
      console.error(
        "Error subscribing to bookings (collection: bookings):",
        error,
      );
    },
  );
};

export const updateBookingStatus = async (
  id: string,
  status: Booking["status"],
) => {
  try {
    const docRef = doc(db, "bookings", id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const updateBooking = async (id: string, updates: Partial<Booking>) => {
  try {
    const docRef = doc(db, "bookings", id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const deleteBooking = async (id: string) => {
  try {
    await deleteDoc(doc(db, "bookings", id));
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

// Contact Messages
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt?: Date;
}

export const submitContactMessage = async (
  message: Omit<ContactMessage, "id" | "status" | "createdAt">,
) => {
  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      ...message,
      status: "unread",
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact message:", error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactMessage[];
  } catch (error) {
    console.error("Error getting contact messages:", error);
    throw error;
  }
};

export const subscribeToContactMessages = (
  callback: (messages: ContactMessage[]) => void,
) => {
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactMessage[];
      callback(messages);
    },
    (error) => {
      console.error("Error subscribing to contact messages:", error);
    },
  );
};

export const updateContactMessageStatus = async (
  id: string,
  status: ContactMessage["status"],
) => {
  try {
    const docRef = doc(db, "contacts", id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error("Error updating contact message status:", error);
    throw error;
  }
};

// Image Upload
export const uploadImage = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteImage = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

// Testimonials
export interface Testimonial {
  id?: string;
  name: string;
  text: string;
  rating: number;
  image?: string;
  featured: boolean;
  createdAt?: Date;
}

export const getTestimonials = async (featuredOnly = false) => {
  try {
    let q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));

    if (featuredOnly) {
      q = query(
        collection(db, "testimonials"),
        where("featured", "==", true),
        orderBy("createdAt", "desc"),
        limit(6),
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error(
      "Error getting testimonials (collection: testimonials):",
      error,
    );
    throw error;
  }
};

export const subscribeToTestimonials = (
  callback: (testimonials: Testimonial[]) => void,
  featuredOnly = false,
) => {
  let q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));

  if (featuredOnly) {
    q = query(
      collection(db, "testimonials"),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(6),
    );
  }

  return onSnapshot(
    q,
    (snapshot) => {
      const testimonials = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[];
      callback(testimonials);
    },
    (error) => {
      console.error(
        "Error subscribing to testimonials (collection: testimonials):",
        error,
      );
    },
  );
};

export const addTestimonial = async (
  testimonial: Omit<Testimonial, "id" | "createdAt">,
) => {
  try {
    const docRef = await addDoc(collection(db, "testimonials"), {
      ...testimonial,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw error;
  }
};

export const updateTestimonial = async (
  id: string,
  updates: Partial<Testimonial>,
) => {
  try {
    const docRef = doc(db, "testimonials", id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    await deleteDoc(doc(db, "testimonials", id));
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};

// Catering Inquiries
export interface CateringInquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  date: string;
  time?: string;
  guests: number;
  message?: string;
  status: "pending" | "contacted" | "confirmed" | "cancelled";
  createdAt?: Date;
}

export const createCateringInquiry = async (
  inquiry: Omit<CateringInquiry, "id" | "status" | "createdAt">,
) => {
  try {
    const docRef = await addDoc(collection(db, "catering-inquiries"), {
      ...inquiry,
      status: "pending",
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating catering inquiry:", error);
    throw error;
  }
};

export const updateCateringInquiryStatus = async (
  id: string,
  status: CateringInquiry["status"],
) => {
  try {
    const docRef = doc(db, "catering-inquiries", id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error("Error updating catering inquiry status:", error);
    throw error;
  }
};

export const updateCateringInquiry = async (
  id: string,
  updates: Partial<CateringInquiry>,
) => {
  try {
    const docRef = doc(db, "catering-inquiries", id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating catering inquiry:", error);
    throw error;
  }
};

export const deleteCateringInquiry = async (id: string) => {
  try {
    await deleteDoc(doc(db, "catering-inquiries", id));
  } catch (error) {
    console.error("Error deleting catering inquiry:", error);
    throw error;
  }
};

export const subscribeToCateringInquiries = (
  callback: (inquiries: CateringInquiry[]) => void,
) => {
  const q = query(
    collection(db, "catering-inquiries"),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const inquiries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CateringInquiry[];
      callback(inquiries);
    },
    (error) => {
      console.error("Error subscribing to catering inquiries:", error);
    },
  );
};

// System Settings
export interface SystemSettings {
  id?: string;
  restaurantName: string;
  email: string;
  phone: string;
  address: string;
  operatingHours: string;
  alcoholDisclaimer: string;
  updatedAt?: Date;
}

export const getSystemSettings = async () => {
  try {
    const q = query(collection(db, "settings"), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    } as SystemSettings;
  } catch (error) {
    console.error("Error getting settings:", error);
    return null;
  }
};

export const updateSystemSettings = async (
  id: string,
  settings: Partial<SystemSettings>,
) => {
  try {
    const docRef = doc(db, "settings", id);
    await updateDoc(docRef, {
      ...settings,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};

export const createSystemSettings = async (
  settings: Omit<SystemSettings, "id">,
) => {
  try {
    const docRef = await addDoc(collection(db, "settings"), {
      ...settings,
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating settings:", error);
    throw error;
  }
};
// WhatsApp Utils
export const generateWhatsAppLink = (phone: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone.replace(/\+/g, "").replace(/\s/g, "")}?text=${encodedMessage}`;
};
