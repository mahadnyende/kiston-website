import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

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

export const addMenuItem = async (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'menu'), {
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  }
};

export const getMenuItems = async (category?: string) => {
  try {
    let q = query(collection(db, 'menu'), orderBy('createdAt', 'desc'));

    if (category && category !== 'all') {
      q = query(collection(db, 'menu'), where('category', '==', category), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];
  } catch (error) {
    console.error('Error getting menu items:', error);
    throw error;
  }
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
  try {
    const docRef = doc(db, 'menu', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'menu', id));
  } catch (error) {
    console.error('Error deleting menu item:', error);
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
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...booking,
      status: 'pending',
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBookings = async (status?: string) => {
  try {
    let q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

    if (status) {
      q = query(collection(db, 'bookings'), where('status', '==', status), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
};

export const updateBookingStatus = async (id: string, status: Booking['status']) => {
  try {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating booking status:', error);
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
  status: 'unread' | 'read' | 'replied';
  createdAt?: Date;
}

export const submitContactMessage = async (message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...message,
      status: 'unread',
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact message:', error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactMessage[];
  } catch (error) {
    console.error('Error getting contact messages:', error);
    throw error;
  }
};

export const updateContactMessageStatus = async (id: string, status: ContactMessage['status']) => {
  try {
    const docRef = doc(db, 'contacts', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating contact message status:', error);
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
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
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
    let q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));

    if (featuredOnly) {
      q = query(collection(db, 'testimonials'), where('featured', '==', true), orderBy('createdAt', 'desc'), limit(6));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error('Error getting testimonials:', error);
    throw error;
  }
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...testimonial,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding testimonial:', error);
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
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
  createdAt?: Date;
}

export const createCateringInquiry = async (inquiry: Omit<CateringInquiry, 'id' | 'status' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'catering-inquiries'), {
      ...inquiry,
      status: 'pending',
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating catering inquiry:', error);
    throw error;
  }
};
