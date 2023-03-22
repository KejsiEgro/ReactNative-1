/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import RootStack from './component/RootStack';
// import 'react-native-gesture-handler';
import SharedDataContext from './contexts/SharedDataContext';

const App = props => {
  const [bookData, setBookData] = useState(null);

    return (
    <>
    <SharedDataContext.Provider value={{ bookData, setBookData }}>
      <RootStack />
    </SharedDataContext.Provider>
    
        </>
  );
};

export default App;
