<?php
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['name'];
    $phone = $data['phone'];
    $email = $data['email'];
    $address = $data['address'];
    $job_title = $data['job_title'];
    $insurance_type = $data['insurance_type'];

    // Gather additional data based on insurance type
    $additional_data = '';
    switch ($insurance_type) {
        case 'تأمين طبي':
        case 'تأمين حياة':
            $employee_count = $data['employee_count'];
            $additional_data = "عدد الموظفين: $employee_count";
            break;
        
        case 'تأمين مركبات':
            $vehicles_count = $data['vehicles_count'];
            $additional_data = "عدد المركبات: $vehicles_count";
            break;

        case 'تأمين ممتلكات':
            $assets_value = $data['assets_value'];
            $additional_data = "قيمة الممتلكات: $assets_value";
            break;

        case 'تأمين المشاريع':
            $project_value = $data['project_value'];
            $project_type = $data['project_type'];
            $additional_data = "قيمة المشروع: $project_value, نوع المشروع: $project_type";
            break;
    }

    // Send the email (replace with your email)
    $to = "sales@sw-insuranceservices.com";
    $subject = "New Cintact Form Subnission  $name";
    $message = "الاسم: $name\nرقم الجوال: $phone\nالبريد الإلكتروني: $email\nالعنوان: $address\nالمُسمى الوظيفي: $job_title\nنوع التأمين المطلوب: $insurance_type\n$additional_data";

    mail($to, $subject, $message);

    echo json_encode(["message" => "تم إرسال الاستفسار بنجاح."]);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "طريقة الطلب غير صحيحة."]);
}
?>
