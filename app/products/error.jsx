"use client"; // Ensure this component is client-side

export default function Error({ error, reset }) {
  return (
    <div className="error-container">
      <div className="error-message">
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Try again</button>
      </div>

      <style jsx>{`
        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f8d7da;
          padding: 20px;
        }

        .error-message {
          text-align: center;
          border: 1px solid #f5c6cb;
          border-radius: 8px;
          padding: 30px;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        h1 {
          font-size: 2rem;
          color: #e74c3c;
          margin-bottom: 20px;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #555;
        }

        button {
          background-color: #e74c3c;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #c0392b;
        }

        @media (max-width: 768px) {
          .error-message {
            padding: 20px;
          }

          h1 {
            font-size: 1.5rem;
          }

          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
