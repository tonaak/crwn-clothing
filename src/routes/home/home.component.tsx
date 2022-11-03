import { Fragment } from 'react';
import Directory from '../../components/directory/directory.component';
import Slideshow from '../../components/slideshow/slideshow.component';

const Home = () => {
  return (
    <Fragment>
      <Slideshow />
      <Directory />;
    </Fragment>
  );
};

export default Home;
