import React from "react";
import "./App.css";
import styled from "styled-components";
import {Navigate, Route, Routes} from "react-router-dom";
import { Login } from "./components/login/login";
import {BooksPage} from "./components/books/booksPage";
import {RequireAuth} from "react-auth-kit";
import {AuthOutlet} from "react-auth-kit"

import BookPage from "./components/books/bookPage";
import Menu from "./components/menu/menu";
import BookAddPage from "./components/books/bookAddPage";
import BookSearchPage from "./components/books/bookSearchPage";
import BookEditPage from "./components/books/bookEditPage";
import ReadersPage from "./components/readers/readersPage";
import {ReaderPage} from "./components/readers/readerPage";
import ReaderAddPage from "./components/readers/readerAddPage";
import ReaderEditPage from "./components/readers/readerEditPage";
import UsersPage from "./components/users/usersPage";
import RegisterAdminPage from "./components/login/registerAdmin";
import RegisterPage from "./components/login/register";



function App() {

  return (
      <div>
          <Menu/>
          <Routes>
              <Route path='/books' element={
                  <RequireAuth loginPath={'/login'}>
                      <BooksPage/>
                  </RequireAuth>
              }/>

              <Route path='/books/:id' element={<BookPage/>}/>
              <Route path='/books/add' element={<BookAddPage/>}/>
              <Route path='/books/search' element={<BookSearchPage/>}/>
              <Route path='/books/:id/edit' element={<BookEditPage/>}/>


              <Route path='/readers' element={<ReadersPage/>}/>
              <Route path='/readers/:id' element={<ReaderPage/>}/>
              <Route path='/readers/add' element={<ReaderAddPage/>}/>
              <Route path='/readers/:id/edit' element={<ReaderEditPage/>}/>

              <Route path='/users' element={<UsersPage/>}/>
              <Route path='/register-admin' element={<RegisterAdminPage/>}/>
              <Route path='/' element={<Navigate to='/books'/>}/>
              <Route path="/login" element={<Login/>}></Route>
              <Route path='/register' element={<RegisterPage/>}/>
          </Routes>
      </div>
  );
}

export default App;
