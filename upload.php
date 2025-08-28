<?php
session_start();

if(isset($_FILES['passport_image'])) {
    $file = $_FILES['passport_image'];

    // بررسی ساده فایل آپلود شده
    $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(!in_array($file['type'], $allowedTypes)) {
        die("فقط فایل‌های عکس قابل قبول است.");
    }

    // ذخیره فایل در پوشه uploads (ایجادش کن)
    $uploadDir = "uploads/";
    if(!is_dir($uploadDir)){
        mkdir($uploadDir);
    }

    $filename = uniqid() . "-" . basename($file['name']);
    $uploadFile = $uploadDir . $filename;

    if(move_uploaded_file($file['tmp_name'], $uploadFile)) {
        $_SESSION['uploaded_image'] = $uploadFile;  // ذخیره مسیر در سشن
    } else {
        die("خطا در آپلود فایل.");
    }
} else {
    die("فایلی ارسال نشده.");
}
?>

<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
<meta charset="UTF-8" />
<title>تایید تصویر و پرداخت</title>
<style>
  body {font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; text-align: center;}
  button, a.btn-primary {font-size: 20px; padding: 15px 30px; border-radius: 8px; margin: 10px; text-decoration:none; display:inline-block;}
  a.btn-primary {background-color: #007bff; color: white; border: none; cursor: pointer;}
  button.reject {background-color: #dc3545; color: white; border: none;}
</style>
</head>
<body>

<h3>تصویر اپلوڈ شدہ</h3>
<img src="<?php echo $uploadFile ?>" style="max-width:80%; border-radius: 10px; border: 2px solid #333;" alt="Uploaded Passport" />
<br><br>

<form action="upload.php" method="POST">
  <input type="hidden" name="reject" value="1" />
  <button type="submit" class="reject">تصویر مسترد کریں</button>
</form>

<br>

<!-- دکمه پرداخت به صفحه payment.php -->
<a href="payment.php" class="btn-primary">ایرانی درگاه - تومان میں ادائیگی</a>

</body>
</html>

<?php
// اگر روی مسترد کلیک شد، فایل حذف شده و برمیگردیم به index.html
if(isset($_POST['reject'])) {
    if(file_exists($_SESSION['uploaded_image'])) {
        unlink($_SESSION['uploaded_image']);
    }
    unset($_SESSION['uploaded_image']);
    header("Location: index.html");
    exit;
}
?>
