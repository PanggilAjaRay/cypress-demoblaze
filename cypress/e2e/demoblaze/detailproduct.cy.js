describe('Demoblaze Product Details', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/')
  });
    it('Verifikasi daftar produk tampil di halaman utama', () => {
    cy.get('.card', { timeout: 10000 }).should('exist');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.get('.card-title').first().should('be.visible');
    cy.get('.card-img-top').first().should('be.visible');
    cy.get('h5').contains('$').first().should('be.visible');
  });

  it('Verifikasi filter kategori Phones', () => {
    cy.get('#itemc').contains('Phones').click();
    cy.wait(1000);
    cy.get('.card-title').should('be.visible');
  });

 it('Verifikasi filter kategori Laptops', () => {
  cy.contains('#itemc', 'Laptops').click(); 
  cy.get('.card-title', { timeout: 10000 }).should('be.visible');
});

  it('Verifikasi filter kategori Monitors', () => {
    cy.contains('#itemc','Monitors').click();
   cy.get('.card-title', { timeout: 10000 }).should('be.visible');
  });

  it('Verifikasi navigasi Pagination Next dan Previous', () => {
    cy.scrollTo('bottom');
    cy.get('#next2').should('be.visible').click();
    cy.wait(1000);
    // Verifikasi untuk halaman berikutnya
    cy.get('#prev2').should('be.visible').click();
    cy.wait(1000);
  });

  it('Verifikasi konsistensi data katalog ke detail dan direct access URL', () => {
    cy.get('.card-title a').first().invoke('text').then((catalogName) => {
      cy.get('.card-title a').first().click();
      
      // Verifikasi halaman detail produk 
      cy.get('.name').should('have.text', catalogName.trim());
      cy.get('.price-container').should('be.visible');
      cy.get('#more-information').should('be.visible');
    });
  });

  it('Verifikasi add to cart dan pop-up alert konfirmasi', () => {
    cy.get('.card-title a').first().click();
    cy.get('.btn-success').contains('Add to cart').should('be.visible');
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get('.btn-success').contains('Add to cart').click();
    cy.get('@alertStub').should('have.been.calledOnceWith', 'Product added');
  });

  it('Verifikasi rapid click pada tombol kategori produk', () => {
  cy.contains('Phones').click();
  cy.contains('Laptops').click();
  cy.contains('Monitors').click();
  cy.wait(1000); 
  
  // Memastikan sistem tetap stabil tanpa blank page
  cy.get('.card').should('exist');
});
  })