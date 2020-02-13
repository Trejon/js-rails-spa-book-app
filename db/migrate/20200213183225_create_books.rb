class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :genre
      t.text :description
      t.integer :page_count
      t.belongs_to :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
