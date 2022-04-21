const Footer = () => {
  return (
    <div>
      <div className="b-example-divider"></div>

      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-muted">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/beer" className="nav-link px-2 text-muted">
                Beer
              </a>
            </li>
          </ul>
          <p className="text-center text-muted">
            &copy; 2022 Amazing Breweries
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
