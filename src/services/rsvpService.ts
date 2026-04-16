import { supabase } from '../lib/supabase';

export interface RSVPData {
  full_name: string;
  attending: boolean;
  email?: string;
  dietary?: string;
  note?: string;
}

export const rsvpService = {
  submitRSVP: async (data: RSVPData): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([{
          full_name: data.full_name,
          attending: data.attending,
          email: data.email || null,
          dietary: data.dietary || null,
          note: data.note || null
        }]);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      console.error("RSVP Submission Error: ", err);
      return { error: err };
    }
  }
};
