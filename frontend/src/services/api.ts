import axios from '@/lib/axios';

/**
 * Lead Submission Interface
 */
export interface LeadData {
  name: string;
  email: string;
  phone: string;
  interestType?: string;
  targetId?: string;
  message?: string;
  service?: string;
}

/**
 * Payment Order Interface
 */
export interface PaymentOrderData {
  amount: number;
  currency?: string;
  receipt: string;
  donorName: string;
  email: string;
  phone: string;
  panNumber?: string;
  sevaCategory?: string;
  receivePrasadam?: boolean;
  deliveryAddress?: any;
}

/**
 * Payment Verification Interface
 */
export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  donorData: any;
}

export const apiService = {
  // CMS Leads
  submitLead: async (data: LeadData) => {
    const response = await axios.post('/api/cms/leads', data);
    return response.data;
  },

  // Payments
  createPaymentOrder: async (data: PaymentOrderData) => {
    const response = await axios.post('/api/payments/create-order', data);
    return response.data;
  },

  verifyPayment: async (data: PaymentVerificationData) => {
    const response = await axios.post('/api/payments/verify-payment', data);
    return response.data;
  },

  // CMS Content
  fetchCmsPage: async (pageId: string) => {
    const response = await axios.get(`/api/cms/pages/${pageId}`);
    return response.data;
  }
};
