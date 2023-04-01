// Компонент спінера відображається, доки відбувається завантаження зображень.
// Використовуйте будь-який готовий компонент, наприклад react-loader-spinner або будь-який інший.
// https://github.com/mhnpd/react-loader-spinner

import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div style= {{textAlign: "center"}}>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};
