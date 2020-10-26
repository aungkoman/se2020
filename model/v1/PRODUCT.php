<?php
class PRODUCT {
    public $product;
    public function __construct() {
        $this->product = R::dispense('product');
    }
    public function insert($data) {
        $this->product->name = (string)isset($data['name']) ? sanitize_str($data['name'], "product->insert : name") : return_fail('product->insert : name is not defined in requested data');
        try {
            $id = R::store($this->product);
            return_success("product->insert", $this->product);
        }
        catch(Exception $exp) {
            return_fail("product->insert : exception ", $exp->getMessage());
        }
    }
    public function select($data) {
        $limit = (int) isset($data['limit']) ? sanitize_int($data['limit'], "product->select : limit int sanitize") : 0;
        $last_id = (int) isset($data['last_id']) ? sanitize_int($data['last_id'], "product->select : last_id int sanitize") : 0;
        //echo "limit is ".$limit;
        if ($limit == 0) $products = R::find('product', ' id > ? ', [$last_id]);
        else $products = R::find('product', ' id > ? LIMIT ?', [$last_id, $limit]);
        $return_data = array();
        foreach ($products AS $index => $product) {
            $return_data[] = $product;
        }
        return_success("product->select " . count($return_data) , $return_data);
    }
    public function update($data) {
        $id = (int)isset($data['id']) ? sanitize_int($data['id']) : return_fail('product->update : id is not defined in requested data');
        $product = R::load('product', $id);
        if ($product->id == 0) return_fail("product->update : no data for requested id");
        $product->name = (string)isset($data['name']) ? sanitize_str($data['name'], "product->update : name") : $product->name;
        try {
            R::store($product);
            return_success("product->update", $product);
        }
        catch(Exception $exp) {
            return_fail("product->update : exception", $exp->getMessage());
        }
    }
    public function delete($data) {
        $id = (int)isset($data['id']) ? sanitize_int($data['id']) : return_fail('product->delete : id is not defined in requested data');
        $product = R::load('product', $id);
        if ($product->id == 0) return_fail("product->delete : no data for requested id");
        try {
            R::trash($product);
            return_success("product->delete", $product);
        }
        catch(Exception $exp) {
            return_fail("product->delete : exception", $exp->getMessage());
        }
    }
} // end for class

?>
