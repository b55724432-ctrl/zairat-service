<?php
session_start();

$merchantID = "YOUR_MERCHANT_ID_HERE";

if (!isset($_GET['Authority']) || !isset($_GET['Status'])) {
    die("اطلاعات لازم برای تایید پرداخت ارسال نشده است.");
}

$authority = $_GET['Authority'];
$status = $_GET['Status'];

if ($status === 'OK') {
    // بررسی پرداخت از طریق API زرین‌پال
    $data = array(
        'MerchantID' => $merchantID,
        'Authority' => $authority,
        'Amount' => 50000
    );

    $jsonData = json_encode($data);

    $ch = curl_init('https://api.zarinpal.com/pg/v4/payment/verify.json');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

    $result = curl_exec($ch);
    curl_close($ch);

    $response = json_decode($result, true);

    if (isset($response['data']) && $response['data']['code'] == 100) {
        // پرداخت موفق
        // می‌تونی اینجا فرایند ادامه کار رو بذاری (ذخیره در دیتابیس، نمایش پیام و غیره)
        ?>
        <!DOCTYPE html>
        <html lang="ur" dir="rtl">
        <head><meta charset="UTF-8" /><title>پرداخت موفق</title></head>
        <body style="text-align:center; font-family: Arial, sans-serif; padding: 30px;">
            <h1>پرداخت با موفقیت انجام شد!</h1>
            <p>ممنون که پرداخت را تکمیل کردید. حالا می‌توانید ادامه فرایند ویزا را دنبال کنید.</p>
            <a href="index.html" style="font-size: 20px; text-decoration:none; color: #007bff;">بازگشت به صفحه اصلی</a>
        </body>
        </html>
        <?php
    } else {
        echo "پرداخت ناموفق بود: ";
        echo $response['errors']['message'] ?? 'خطای نامشخص';
    }
} else {
    echo "پرداخت لغو شد یا ناموفق بود.";
}
?>
