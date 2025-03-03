<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingNotification extends Notification
{
    use Queueable;

    // $parking_name, $name, $start_time, $end_time, $total, $fixed_end_time, $date, $rate $slot_number;
    protected $info;
    /**
     * Create a new notification instance.
     */
    public function __construct($info)
    {
        $this->info = $info;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Booking Confirmation from Smart Car Parkings')
                    
                    ->greeting('Hello, ' . $this->info['name'])
                    ->line('Your booking for '. $this->info['parking_name']. ' is confirmed on date '. $this->info['date'])
                    ->line('Time is '. $this->info['start_time'] . '-'. $this->info['end_time'])
                    ->line('Your Slot number is '. $this->info['slot_number'] + 1)
                    ->line('Total amount: '. $this->info['total'])
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
