import './App.css';
import React, { useState, useEffect } from "react";
import { Record, fetchRecords } from "./features/flats/get";
import { useAppDispatch, useAppSelector } from './app/hooks';
import axios from 'axios';
import Header from './Header';


const ITEMS_PER_PAGE = 10;

function App() {
  const fetchedRecords = useAppSelector((state) => state.fetchedRecords);
  const dispatch = useAppDispatch();

  const [isUpdating, setIsUpdating] = useState(false);
   const [selectedRecord, setSelectedRecord] = useState({
    id: 0,
    title: "",
    img_url: "",
    note: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRecordClick = (record: Record) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getTotalPages = () => {
    return Math.ceil(fetchedRecords.records.length / ITEMS_PER_PAGE);
  };

  const getPageRecords = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return fetchedRecords.records.slice(startIndex, endIndex);
  };

  async function handleUpdateDB() {
    setIsUpdating(true); 
    const response = await axios.post(
      `http://localhost:3001/flats/`,
    );
    console.log(response)
    setIsUpdating(false);
    dispatch(fetchRecords())
  }

  return (
    <div>      
     <Header />
     <div className="container">
       <div className="list">
         <h2>Available flats:</h2>
         {fetchedRecords.loading && <div>Loading...</div>}
         {!fetchedRecords.loading && fetchedRecords.error && <div>Error: {fetchedRecords.error}</div>}
         {!fetchedRecords.loading && getPageRecords().length > 0 && (
           <ul className="beautiful-list">
             {getPageRecords().map((record) => (
               <li key={record.id} onClick={() => handleRecordClick(record)}>
                 <div className="record-title">{record.title}</div>
               </li>
             ))}
           </ul>
         )}
         <div className="pagination">
           <button onClick={handlePreviousPage} disabled={currentPage === 1}>
             {'<'}
           </button>
           <div className='page-number'>page {currentPage} of {getTotalPages()}</div>
           <button onClick={handleNextPage} disabled={currentPage === getTotalPages()}>
            {'>'}
           </button>
           
         </div>
       </div>
 
       {selectedRecord && showForm && (
         <div className="form">
           <h2>{selectedRecord.title}</h2>
           <img src={selectedRecord.img_url} alt={'https://d18-a.sdn.cz/d_18/c_img_QN_J9/nGOkIW.jpeg?fl=res,400,300,3|shr,,20|jpg,90'} />
         </div>
       )}
 
       <div className="update-button-container">
       {isUpdating ? (
            <div className="fetching-label">
              Getting data from Sreality.cz and updating PostgreSQL database...
            </div>
          ) : (
            <button onClick={handleUpdateDB}>Update</button>
          )}
       </div>
     </div>
    </div>
  );
}

export default App;