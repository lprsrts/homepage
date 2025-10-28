/**
 * Example component demonstrating semantic color usage
 * This file shows how to use semantic colors throughout your application
 */

export default function SemanticColorsExample() {
  return (
    <div className="space-y-6">
      {/* Semantic Buttons */}
      <div className="space-x-2">
        <button className="btn-primary">Primary Action</button>
        <button className="btn-success">Success Action</button>
        <button className="btn-warning">Warning Action</button>
        <button className="btn-danger">Danger Action</button>
        <button className="btn-info">Info Action</button>
      </div>

      {/* Semantic Text */}
      <div className="space-y-2">
        <p className="text-primary">Primary text - uses main theme color</p>
        <p className="text-success">Success message - operation completed</p>
        <p className="text-warning">Warning message - proceed with caution</p>
        <p className="text-danger">Danger message - critical error</p>
        <p className="text-info">Info message - additional information</p>
        <p className="text-muted">Muted text - secondary information</p>
      </div>

      {/* Custom Semantic Usage */}
      <div>
        <button
          className="px-4 py-2 border"
          style={{
            backgroundColor: "var(--color-success)",
            color: "white",
            borderColor: "var(--color-success)",
          }}
        >
          Custom Success Button
        </button>
      </div>
    </div>
  );
}
