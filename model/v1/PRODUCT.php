<?php
class PRODUCT {
    public $product;
    public function __construct() {
        $this->product = R::dispense('product');
    }

    public function insert($data) {
        $this->product->name = (string)isset($data['name']) ? sanitize_str($data['name'], "product->insert : name") : return_fail('product->insert : name is not defined in requested data');
        
        $this->product->description = (string)isset($data['description']) ? sanitize_str($data['description'], "product->insert : description") : return_fail('product->insert : description is not defined in requested data');
        
        $this->product->image = (string)isset($data['image']) ? sanitize_str($data['image'], "product->insert : image") : return_fail('product->insert : image is not defined in requested data');

        $this->product->size = (int)isset($data['size']) ? sanitize_int($data['size'], "product->insert : size") : return_fail('product->insert : size is not defined in requested data');
        
        $this->product->color = (int)isset($data['color']) ? sanitize_int($data['color'], "product->insert : color") : return_fail('product->insert : color is not defined in requested data');
        
        $this->product->price = (int)isset($data['price']) ? sanitize_int($data['price'], "product->insert : price") : return_fail('product->insert : price is not defined in requested data');
        
        $this->product->stock = (int)isset($data['stock']) ? sanitize_int($data['stock'], "product->insert : stock") : return_fail('product->insert : stock is not defined in requested data');
        
        $this->product->warehouse = (int)isset($data['warehouse']) ? sanitize_int($data['warehouse'], "product->insert : warehouse") : return_fail('product->insert : warehouse is not defined in requested data');
        
        $this->product->category = (int)isset($data['category']) ? sanitize_int($data['category'], "product->insert : category") : return_fail('product->insert : category is not defined in requested data');
        
        try {
            $id = R::store($this->product);
            $this->product->id_encrypted = encrypt($id);
            R::store($this->product);
            $this->product->id = encrypt($this->product->id);
            return_success("product->insert", $this->product);
        }
        catch(Exception $exp) {
            return_fail("product->insert : exception ", $exp->getMessage());
        }
    }

    public function select($data) {
        $search = (string) isset($data['search']) ? sanitize_str($data['search'], "product->select : search string sanitize") : "";
        $limit = (int) isset($data['limit']) ? sanitize_int($data['limit'], "product->select : limit int sanitize") : 0;
        $pagination = (int) isset($data['pagination']) ? sanitize_int($data['pagination'], "product->select : pagination int sanitize") : 0;
        $last_id_encrypted = (string) isset($data['last_id']) ? sanitize_str($data['last_id'], "product->select : last_id str sanitize") : encrypt(0);
        $last_id = decrypt($last_id_encrypted);
        // product count
        $total_product_count = R::count('product');
        // search
        if($search != ""){
            if ($limit == 0) $products = R::find('product', ' name LIKE ?', ["%".$search."%"]);
            else $products = R::find('product', ' name LIKE ? LIMIT ?', ["%".$search."%",$limit]);
        }
        // last id next for
        else if($last_id != 0){
            if ($limit == 0) $products = R::find('product', ' id > ? ', [$last_id]);
            else $products = R::find('product', ' id > ? LIMIT ?', [$last_id, $limit]);
        }
        // pagination
        else {
            if($limit == 0 ) $products=R::findAll('product','LIMIT ?, ?',[$pagination,$total_product_count]);
            else $products=R::findAll('product','LIMIT ?,? ',[$pagination,$limit]);
        }
        $return_data = array();
        foreach ($products AS $index => $product) {
            $product->id = encrypt($product->id);
            $product->name = html_decode($product->name);
            $product->description = html_decode($product->description);
            $return_data[] = $product;
        }
        return_success($total_product_count, $return_data);
    }
    
    public function detail($data) {
        $encrypt_id = (string)isset($data['id']) ? sanitize_str($data['id']) : return_fail('product->detail : id is not defined in requested data');
        $id = decrypt($encrypt_id);
        $product = R::load('product', $id);
        if ($product->id == 0) return_fail("product->detail : no data for requested id ".$encrypt_id);
        $product->id = encrypt($product->id);
        $product->name = html_decode($product->name);
        $product->description = html_decode($product->description);
        return_success("product->detail ", $product);
    }

    public function update($data) {
        $encrypt_id = (string)isset($data['id']) ? sanitize_str($data['id']) : return_fail('product->update : id is not defined in requested data');
        $id = decrypt($encrypt_id);

        $product = R::load('product', $id);
        if ($product->id == 0) return_fail("product->update : no data for requested id ".$encrypt_id);
        $product->name = (string)isset($data['name']) ? sanitize_str($data['name'], "product->update : name") : $product->name;
        $product->description = (string)isset($data['description']) ? sanitize_str($data['description'], "product->update : description") : $product->description;
        $product->image = (string)isset($data['image']) ? sanitize_str($data['image'], "product->update : image") : $product->image;
        $product->size = (int)isset($data['size']) ? sanitize_int($data['size'], "product->update : size") : $product->size;
        $product->color = (int)isset($data['color']) ? sanitize_int($data['color'], "product->update : color") : $product->color;
        $product->price = (int)isset($data['price']) ? sanitize_int($data['price'], "product->update : price") : $product->price;
        $product->stock = (int)isset($data['stock']) ? sanitize_int($data['stock'], "product->update : stock") : $product->stock;
        $product->warehouse = (int)isset($data['warehouse']) ? sanitize_int($data['warehouse'], "product->update : warehouse") : $product->warehouse;
        $product->category = (int)isset($data['category']) ? sanitize_int($data['category'], "product->update : category") : $product->category;
        
        try {
            R::store($product);
            $product->id = encrypt($product->id);
            $product->name = html_decode($product->name);
            $product->description = html_decode($product->description);
            return_success("product->update", $product);
        }
        catch(Exception $exp) {
            return_fail("product->update : exception", $exp->getMessage());
        }
    }

    public function delete($data) {
        $encrypt_id = (string)isset($data['id']) ? sanitize_str($data['id']) : return_fail('product->delete : id is not defined in requested data');
        $id = decrypt($encrypt_id);
        $product = R::load('product', $id);
        if ($product->id == 0) return_fail("product->delete : no data for requested id ".$encrypt_id);
        try {
            R::trash($product);
            $product->id = encrypt($product->id);
            $product->name = html_decode($product->name);
            $product->description = html_decode($product->description);
            return_success("product->delete", $product);
        }
        catch(Exception $exp) {
            return_fail("product->delete : exception", $exp->getMessage());
        }
    }

    public function delete_multiple($data) {
        $delete_ids = (string) isset($data['ids']) ? $data['ids'] : return_fail('product->delete_multiple : ids is not defined in requested data');
        $delete_arr = json_decode($delete_ids,true);
        if(gettype($delete_arr) == 'NULL' ) return_fail("product->delete_multiple : ids does not valid json array ");
        R::begin();
        for($i = 0; $i < count($delete_arr); $i++){
            $encrypt_id = (string) sanitize_str($delete_arr[$i]);
            $id = decrypt($encrypt_id);
            $product = R::load('product', $id);
            if ($product->id == 0) return_fail("product->delete_multiple : no data for requested id ".$encrypt_id);
            try {
                R::trash($product);
            }
            catch(Exception $exp) {
                R::rollback();
                return_fail("product->delete_multiple : exception and rollback", $exp->getMessage());
            }
        }
        R::commit(); // yes we get it :D
        return_success("product->delete", $delete_ids);
    }
} // end for class

?>
