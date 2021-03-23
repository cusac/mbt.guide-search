import React from 'react';

const AppFooter = (): any => {
  return (
    <div className="AppFooter">
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="text-center js-animate-center">
            2014 © My Big Toe LLC.{' '}
            <a href="https://www.my-big-toe.com/privacy-notice/">Privacy Notice</a> |{' '}
            <a href="https://www.my-big-toe.com/shipping-returns/">Shipping &amp; Returns</a> <br />
            Designed and Developed by{' '}
            <a href="http://seattleseoconsultant.com/" target="_blank" rel="nofollow">
              SeattleSeoConsultant.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

AppFooter.defaultProps = {};

export default AppFooter;
