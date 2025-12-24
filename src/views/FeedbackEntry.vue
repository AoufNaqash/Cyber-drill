<template>
  <div class="max-w-4xl mx-auto">
    <h3 class="text-2xl font-medium text-gray-700 mb-6">Evaluation: Phishing Defense Alpha</h3>
    
    <div class="bg-surface rounded-lg shadow-md p-6">
      <form @submit.prevent="">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Select Student</label>
          <select class="w-full border border-gray-300 rounded-md p-2">
            <option>Ahmad Ali (Matric: 191023)</option>
            <option>Sarah Tan (Matric: 192044)</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Detection Speed (1-10)</label>
            <input type="number" min="1" max="10" class="w-full border border-gray-300 rounded-md p-2" placeholder="8">
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Mitigation Accuracy (1-10)</label>
            <input type="number" min="1" max="10" class="w-full border border-gray-300 rounded-md p-2" placeholder="7">
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Instructor Feedback</label>
          <textarea class="w-full border border-gray-300 rounded-md p-2 h-32" placeholder="Enter constructive feedback here..."></textarea>
        </div>

        <button class="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition">
          Submit Evaluation
        </button>
      </form>
    </div>
  </div>
</template>