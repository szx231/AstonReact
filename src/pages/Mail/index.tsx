import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Wrapp, Table, Tbody } from './styled';

import { MessageCard } from '../../components/MessageCard';
import { Pagination } from '../../components/Pagination';

import { useAppSelector } from '../../store/hooks';
import { Search } from '../../components/UI/Search';
import { Mails } from '../../store/FetchEmails/types';
import { useLazyGetFavoriteListQuery, useLazyGetAllEmailsQuery } from '../../store/EmailsApi';

const Mail = () => {
  const { category } = useAppSelector((state) => state.currentCategorySlice);
  const { inputValue } = useAppSelector((state) => state.searchSlice);

  const [fetchEmails, { data = [], isLoading, isError, isSuccess, isFetching }] = useLazyGetAllEmailsQuery();

  const [fetchFavoriteList, { data: favoriteMessageList = [], isSuccess: isSuccessFavorite }] =
    useLazyGetFavoriteListQuery();

  useEffect(() => {
    fetchFavoriteList();
    fetchEmails({ category, inputValue });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [_, setSearchParams] = useSearchParams({ category, page: currentPage + 1 });

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = (dataMessages: Mails[]) => {
    return dataMessages.slice(itemOffset, endOffset);
  };

  const pageCount = (dataMessages: Mails[]) => {
    return Math.ceil(dataMessages.length / itemsPerPage);
  };

  const changePageNumber = (event) => {
    const buttonNumber = event.selected;
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setCurrentPage(buttonNumber);
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setCurrentPage(() => {
      return 0;
    });
    setItemOffset(() => {
      return 0;
    });
  }, [category]);

  useEffect(() => {
    if (inputValue.length) {
      setSearchParams({ category, page: currentPage + 1, search: inputValue });
    } else {
      setSearchParams({ category, page: currentPage + 1 });
    }
  }, [currentPage, category, inputValue]);

  const reFetchData = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      fetchEmails({ category, inputValue });
    }
  };

  const clearInputRefetchData = () => {
    const inputValue = '';
    fetchEmails({ category, inputValue });
  };

  useEffect(() => {
    console.log(favoriteMessageList, 'list');
  }, [favoriteMessageList]);

  return (
    <Wrapp>
      {isError && <div>Ошибка</div>}
      {isFetching && <div>loading</div>}
      {data && isSuccessFavorite && (
        <>
          <Search reFetchData={reFetchData} clearInputRefetchData={clearInputRefetchData} />
          <Table>
            <Tbody>
              {currentItems(data).map((el, index: number) => {
                return (
                  <MessageCard
                    favoriteMeesage={favoriteMessageList.includes(el.author.email)}
                    key={el.author.email}
                    imageProp={el.author.avatar && el.author.avatar}
                    name={`${el.author.name} ${el.author.surname}`}
                    title={el.title}
                    description={el.text}
                    read={el.read}
                    messageCategory={el.flag && el.flag}
                    ind={index}
                    serverMessageDate={el.date}
                    attach={el.doc}
                    messageIsImportant={el.important}
                    messageIsBookMark={el.bookmark}
                    message={el}
                  />
                );
              })}
              {isSuccess && data.length === 0 && <div>Ничего не найдено</div>}
            </Tbody>
          </Table>
          {data.length > 5 && (
            <Pagination handlePageClick={changePageNumber} pageCount={pageCount(data)} currentPage={currentPage} />
          )}
        </>
      )}
    </Wrapp>
  );
};

export default Mail;
