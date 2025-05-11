import { Routes, Route } from 'react-router-dom';

/**
 * Local Import
 */
import HeaderPart from './header';
import Footer from './footer';
import PostLists from './post-lists';
import PostDetail from './post-detail';

function App() {


  return (
    <div className="App">
      <HeaderPart />
      <main>
        <Routes>
          <Route path="/" element={<PostLists />} />
          <Route path="/blog/" element={<PostLists />} />
          <Route path="/blog/:id" element={<PostDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
