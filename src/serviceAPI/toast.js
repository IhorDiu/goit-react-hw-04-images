import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastSetup = {
  position: 'top-center',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const toastErrorMessage = () => {
  return toast.error('Images not found ...', toastSetup);
};


export const toastWarningMessage = () => {
  return toast.warning('Enter your request', toastSetup);
};

export const toastInfoMessage = (message) => {
  return toast.info(message, toastSetup);
};