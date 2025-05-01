"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TestSignupPage() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("test1234");
  const [result, setResult] = useState<any>(null);

  const handleTestSignup = async () => {
    const res = await supabase.auth.signUp({ email, password });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-center">
          Test d&apos;inscription Supabase
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full p-2 border rounded-md"
        />

        <button
          onClick={handleTestSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Tester l&apos;inscription
        </button>

        {result && (
          <pre className="text-xs bg-gray-100 p-2 border rounded overflow-auto max-h-64">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
