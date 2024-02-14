import { Routes, Route } from "react-router-dom";
import { authSuccess } from "./slicers/auth";
import AuthService from "./services/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getItem } from "./helpers";

// Pages
import { Home } from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ArticleDetail from "./pages/article-detail";
import CreateArticle from "./pages/create-article";
import EditArticle from "./pages/edit-article";
import UserDetail from "./pages/user-detail";
import EditProfile from "./pages/edit-profile";
import Saved from "./pages/saved";
import UserInfo from "./pages/user-info";

export default function App() {
  const dispatch = useDispatch()
  const token = getItem('token')

  const getUser = async e => {
    try {
      const response = await AuthService.getUser()
      dispatch(authSuccess(response.user))
    } catch (error) {
      console.error(error)
    }
  }

 useEffect(() => {
  if (token) {
    getUser()
  }
 }, token)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/article/:slug" element={<ArticleDetail/>} />
        <Route path="/create-article" element={<CreateArticle/>} />
        <Route path="/edit/:slug" element={<EditArticle/>} />
        <Route path="/profile" element={<UserDetail/>} />
        <Route path="/profile/edit" element={<EditProfile/>} />
        <Route path="/saved" element={<Saved/>} />
        <Route path="/:username" element={<UserInfo/>} />
      </Routes>
    </div>
  )
}