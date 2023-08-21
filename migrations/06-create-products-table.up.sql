CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  purchase_price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NULL DEFAULT 0,
  company_id VARCHAR(36) NOT NULL,
  category_id INT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME,
  deleted_at DATETIME,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_name (name),
  INDEX idx_company_id (company_id),
  INDEX idx_category_id (category_id),
  INDEX idx_is_deleted (is_deleted)
);