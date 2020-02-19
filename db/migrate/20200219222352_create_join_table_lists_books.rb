class CreateJoinTableListsBooks < ActiveRecord::Migration[6.0]
  def change
    create_join_table :lists, :books do |t|
      t.index [:list_id, :book_id], unique: true
      # t.index [:book_id, :list_id]
    end
  end
end
