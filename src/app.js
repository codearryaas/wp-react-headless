
/**
 * Local Import
 */
import HeaderPart from './header';
import Footer from './footer';
import PostLists from './post-lists';

function App() {


  return (
    <div className="App">
      <HeaderPart />
      <main>
        <PostLists />
      </main>
      <Footer />
    </div>
  );
}

export default App;
