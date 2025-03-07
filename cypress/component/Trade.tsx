describe('<TradePage />', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'dummyToken'); // Use a valid token or stub authentication
    cy.intercept('GET', '/api/trade/portfolio', {
      statusCode: 200,
      body: { user: { username: 'testUser', cash: 100000 }, trades: [] },
    }).as('getPortfolio');

    cy.intercept('POST', '/api/trade/buy', (req) => {
      req.reply({
        statusCode: 200,
        body: { _id: 'trade123', symbol: req.body.symbol, shares: req.body.shares, price: 200, tradeType: 'BUY', date: new Date().toISOString() },
      });
    }).as('buyTrade');
  });

  it('should display the portfolio and process a trade', () => {
    cy.visit('/');
    cy.wait('@getPortfolio');
    cy.contains('Cash Balance: $100000');
    cy.get('input[placeholder="Stock Symbol"]').type('AAPL');
    cy.get('input[placeholder="Shares"]').type('10');
    cy.get('button').contains('Submit Trade').click();
    cy.wait('@buyTrade');
    cy.contains('BUY 10 shares of AAPL at $200');
  });
});
