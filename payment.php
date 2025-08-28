<?php
session_start();

if(!isset($_SESSION['uploaded_image'])) {
    die("ابتدا باید تصویر را آپلود کنید.");
}

// تنظیمات زرین‌پال
$merchantID = "YOUR_MERCHANT_ID_HERE";  // این رو از پنل زرین‌پال بگیر
$amount = 50000; // مبلغ به تومان (مثلاً ۵۰ هزار تومان)
$description = "پرداخت هزینه ویزا";
$email = "";  // اگر می‌خوای ایمیل بگیری
$mobile = ""; // شماره موبایل اختیاری

$callbackUrl = "https://your-site.com/verify.php"; // آدرس برگشت بعد از پرداخت موفق

// ساخت آرایه درخواست
$data = array(
    'MerchantID' => $merchantID,
    'Amount' => $amount,
    'Description' => $description,
    'Email' => $email,
    'Mobile' => $mobile,
    'CallbackURL' => $callbackUrl
);

$jsonData = json_encode($data);

$ch = curl_init('https://api.zarinpal.com/pg/v4/payment/request.json');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

$result = curl_exec($ch);
curl_close($ch);

$response = json_decode($result, true);

if(isset($response['data']) && $response['data']['code'] == 100) {
    $authority = $response['data']['authority'];
    // ریدایرکت به صفحه پرداخت زرین‌پال
    header('Location: https://www.zarinpal.com/pg/StartPay/' . $authority);
    exit();
} else {
    echo "خطا در ایجاد درخواست پرداخت: ";
    echo $response['errors']['message'] ?? 'Unknown error';
}
?>
