<?php

namespace Database\Factories;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition()
    {
        return [
            //
            'name' => $this->faker->name(),
            'videoURL' => $this->faker->filePath(),
            'user_id' => User::factory(),
            'subject_id' => Subject::factory()
        ];
    }
}
