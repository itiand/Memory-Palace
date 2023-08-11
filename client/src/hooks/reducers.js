// // import useApplicationData from "./useApplicationData";

// export const ACTIONS = {
//   TOGGLE_ADD_NEW_PALACE: 'TOGGLE_ADD_NEW_PALACE',
//   TOGGLE_REGULAR_PALACE: 'TOGGLE_REGULAR_PALACE',
//   TOGGLE_ADD_ROOM: 'TOGGLE_ADD_ROOM',
//   TOGGLE_ADD_MEMORY: 'TOGGLE_ADD_MEMORY',
// };


// // import { ACTIONS } from './reducers'; // Import your action types

// export const initialState = {
//   // ... other state properties ...
//   isAddNewPalaceModalOpen: false,
//   isRegularPalaceModalOpen: false,
//   isAddRoomModalOpen: false,
//   isAddMemoryModalOpen: false,
// };

// export const reducer = function(state, action) {
//   switch (action.type) {
//     case ACTIONS.TOGGLE_ADD_NEW_PALACE_MODAL:
//       return {
//         ...state,
//         isAddNewPalaceModalOpen: !state.isAddNewPalaceModalOpen,
//       };
//     case ACTIONS.TOGGLE_REGULAR_PALACE_MODAL:
//       return {
//         ...state,
//         isRegularPalaceModalOpen: !state.isRegularPalaceModalOpen,
//       };
//     case ACTIONS.TOGGLE_ADD_ROOM_MODAL:
//       return {
//         ...state,
//         isAddRoomModalOpen: !state.isAddRoomModalOpen,
//       };
//     case ACTIONS.TOGGLE_ADD_MEMORY_MODAL:
//       return {
//         ...state,
//         isAddMemoryModalOpen: !state.isAddMemoryModalOpen,
//       };
//     // ... other cases ...
//     default:
//       throw new Error(
//         `Unsupported Action Type: ${action.type}`
//       );
//   }
// };