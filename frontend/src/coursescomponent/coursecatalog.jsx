import React from "react";
import { catalogsData } from "../data/coursecatalog";
import "./coursecatalog.css";

const CourseCatalogPage = () => {
  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Course Catalog</h1>

      <div className="catalog-grid">
        {catalogsData.map((catalog) => (
          <div
            key={catalog.id}
            className="catalog-card"
            style={{ borderTopColor: catalog.color }}
          >
            <div
              className="catalog-icon"
              style={{ backgroundColor: catalog.color }}
            >
              {catalog.icon}
            </div>
            <h3 className="catalog-name">{catalog.name}</h3>
            <p className="catalog-description">{catalog.description}</p>
            <div className="catalog-footer">
              <span className="course-count">
                📚 {catalog.totalCourses} Courses
              </span>
              <button
                className="view-btn"
                style={{ backgroundColor: catalog.color }}
              >
                View Courses →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalogPage;
