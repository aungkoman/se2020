# Restful Webservice for User CRUD
 Restful Webservice ကို PHP နဲ့ ရေးထားပါတယ်။ Webservice Security ပိုင်းအနေနဲ့ JWT သုံးပြီး firebase/php-jwt ကို composer ကတဆင့် ထည့်သွင်းထားပါတယ်။
## Database ORM
Redbean ကို သုံးထားပါတယ်။ ORM သုံးထားတော့ Database Schema ကို ပြောင်းရတာ သိပ်ပြီး စိတ်မညစ်ရတော့တာပေါ့။
 
 https://www.redbeanphp.com/
## Testing
Postman နဲ့ စမ်းနိုင်ပါတယ်။
 
 https://www.postman.com/

### Project Progress
- File and Folder Structure
- Basic CRUD for Atomic Model


# Note
ဒါကတော့ ဒီအတိုင်းရေးတာပါ။ ကိုယ့် Code တွေကို ပြန်ဖတ်တဲ့အခါမှာ အဲ့တုန်းက ကြုံခဲ့ရတဲ့ ပြသနာတွေ၊ ကိုယ်ဖြေရှင်းခဲ့တဲ့ logic တွေ၊ နောက်ဆုံး ထွက်လာတဲ့ အခုမြင်နေရတဲ့ ရှင်းလင်းတဲ့ code တွေ... အကုန်လုံးဟာ ရုပ်ရှင်တစ်ကားကို ကြည့်နေရသလို အစအဆုံး ပြန်ခံစားမိတယ်။
 
 ကျေးဇူးတင်ပါတယ်၊ အခုလိုမျိုး clean code တွေ ရေးပေးခဲ့လို့။

## 2020-10-21
Red Bean Transaction : ကိုယ့်ရဲ့ transaction က ရှည်လျားထွေပြားလာပြီး အမှားခံလို့ မရတဲ့အခါမှာ Rollback တွေ ၊ Commit တွေ စသုံးလာရတယ်။ Red Bean မှာက လွယ်ပါတယ်။
```php
    R::begin();
    try{
        R::store($page);
        R::commit();
    }
    catch(Exception $e) {
        R::rollback();
    }
```
ဒါပဲ ရေးရုံပဲ။ တစ်ခုပဲ ရှိတယ်။ Database ကို Freeze လုပ်ထားပေးဖို့တော့ လိုတယ်။ ကျွန်တော်တို့ က Development Stage မှာ Database ကို Fluid Mode ထားပြီ: ရေးကြတာဆိုတော့ Transaction တွေ ပါလာပြီး rollback တွေ၊ commit တွေ လုပ်တော့မယ် ဆိုရင် Freeze လုပ်လိုက်ဖို့ လိုတယ်။
```
    R::setup();
    R::freeze( TRUE );
```
Isn't cool? :stuck_out_tongue_closed_eyes:

