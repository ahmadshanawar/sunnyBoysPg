import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const initialState = {
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
  status: 'Awaiting Approval',
  role: 'READ',
  occupancyType: 'double',
  finalizedRent: '2500',
  adhaarFrontFileName: '',
  adhaarBackFileName: '',
  collegeIdPhotoFileName:'',
  isUserRegistred:false
}

const resetUserToEmpty = () => {
  const emptyUser = Object.fromEntries(Object.keys(initialState).map(key => [key, '']));
  return emptyUser;
};
export const useAppStore = create(
  persist(
    (set) => ({
      user: initialState,
      setUser: (value) => set((state) => ({ user: { ...state.user, ...value } })),
      isLoggedIn: false,
      setIsLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
      resetUser: () => set(() => ({ user: resetUserToEmpty() })),
    }),
    {
      name: 'sunny_pg', // name of the item in the storage (must be unique)

    },
  ),
)