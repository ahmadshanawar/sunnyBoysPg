import { create } from 'zustand'
import { persist } from 'zustand/middleware'
const initialState = {
  adhaarNumber: '',
  checkInDate: '',
  checkOutDate: '',
  city: '',
  collegeId: '',
  collegeName: '',
  email: '',
  emailUid: '',
  houseNumber: '',
  lane: '',
  locality: '',
  mobile: '',
  mobileUid: '',
  name: '',
  occupation: '',
  parentMobile: '',
  parentName: '',
  password: '',
  pinCode: '',
  status: 'awaiting Approval',
  role: '',
  occupancyType: '',
  finalizedRent: '',
  payments: [],
  adhaarFrontFileName: '',
  adhaarBackFileName: '',
  alternateIdFileName: '',
  profilePictureFileName: ''
}

export const useAppStore = create(
  persist(
    (set) => ({
      user: initialState,
      setUser: (value) => set((state) => ({ user: { ...state.user, ...value } })),
      isLoggedIn: false,
      setIsLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
    }),
    {
      name: 'sunny_pg', // name of the item in the storage (must be unique)

    },
  ),
)