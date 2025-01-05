// App.js (Frontend Application)
import React, { useState } from 'react';
import './App.css';

import beanie from './assets/icons/beanie.svg';
import buttonsleeve from './assets/icons/buttonsleeve.svg';
import buttontee from './assets/icons/buttontee.svg';
import cap from './assets/icons/cap.svg';
import coat from './assets/icons/coat.svg';
import hat from './assets/icons/hat.svg';
import hoodie from './assets/icons/hoodie.svg';
import jacket from './assets/icons/jacket.svg';
import longsleeve from './assets/icons/longsleeve.svg';
import necklace from './assets/icons/necklace.svg';
import pants from './assets/icons/pants.svg';
import puffer from './assets/icons/puffer.svg';
import scarf from './assets/icons/scarf.svg';
import shoes from './assets/icons/shoes.svg';
import shorts from './assets/icons/shorts.svg';
import suit from './assets/icons/suit.svg';
import sunglasses from './assets/icons/sunglasses.svg';
import sweater from './assets/icons/sweater.svg';
import tank from './assets/icons/tank.svg';
import trousers from './assets/icons/trousers.svg';
import tshirt from './assets/icons/tshirt.svg';
import zipper from './assets/icons/zipper.svg';
import hanger from './assets/icons/hanger.svg';

function App() {
  const [closet, setCloset] = useState({
    tops: [],
    bottoms: [],
    accessories: [],
    shoes: []
  });

  const [showDropdowns, setShowDropdowns] = useState({
    tops: false,
    bottoms: false,
    accessories: false,
    shoes: false
  });

  const [showAddClothingMenu, setShowAddClothingMenu] = useState(false);
  const [clothingType, setClothingType] = useState("tops");
  const [clothingColor, setClothingColor] = useState("");
  const [clothingDescription, setClothingDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [makeDirtyMode, setMakeDirtyMode] = useState(false);
  const [outfits, setOutfits] = useState([]); // List of saved outfits
  const [selectingOutfit, setSelectingOutfit] = useState(false); // Toggle for selecting outfit mode
  const [currentOutfit, setCurrentOutfit] = useState(null); // Stores the currently selected outfit
  const [displayedOutfit, setDisplayedOutfit] = useState(null); // Stores the outfit to be displayed



  const handleAddClothing = () => {
    if (!clothingColor || !clothingDescription || !selectedIcon) return;
    const newClothing = {
      icon: selectedIcon,
      color: clothingColor,
      description: clothingDescription,
      clean: true // Default to clean when added
    };
    setCloset((prevCloset) => ({
      ...prevCloset,
      [clothingType]: [...prevCloset[clothingType], newClothing],
    }));
    setClothingColor('');
    setClothingDescription('');
    setSelectedIcon(null);
  };

  const handleSelectOutfitItem = (category, index) => {
    if (!selectingOutfit) return; // Only allow selection in outfit mode
    setCurrentOutfit((prevOutfit) => ({
      ...prevOutfit,
      [category]: [...(prevOutfit?.[category] || []), closet[category][index]],
    }));
  };
  
  const handleRemoveClothing = (category, index) => {
    if (!removeMode) return;
    setCloset((prevCloset) => {
      const updatedCategory = prevCloset[category].filter((_, i) => i !== index);
      return { ...prevCloset, [category]: updatedCategory };
    });
  };

  const handleMakeClothingDirty = (category, index) => {
    if (!makeDirtyMode) return; 
    setCloset((prevCloset) => {
      const updatedCategory = prevCloset[category].map((item, i) =>
        i === index ? { ...item, clean: false } : item
      );
      return { ...prevCloset, [category]: updatedCategory };
    });
  };

  const makeAllClothesClean = () => {
    setCloset((prevCloset) => {
      const updatedCloset = {};
      Object.keys(prevCloset).forEach((category) => {
        updatedCloset[category] = prevCloset[category].map((item) => ({ ...item, clean: true }));
      });
      return updatedCloset;
    });
  };

  const getRandomOutfit = () => {
    const cleanOutfits = outfits.filter((outfit) =>
      Object.keys(outfit).every((category) =>
        outfit[category].every((item) => item.clean)
      )
    );
  
    if (cleanOutfits.length === 0) {
      alert("No clean outfits available!");
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * cleanOutfits.length);
    setDisplayedOutfit(cleanOutfits[randomIndex]); // Set the selected outfit
  };  

  const renderClothingItems = (category, isClean) => {
    return (
      <div className="dropdown-content">
        {closet[category]
          .filter((item) => item.clean === isClean)
          .map((item, index) => (
          <div
            key={index}
            className={`clothing-item ${selectingOutfit ? "selecting-outfit" : ""} ${removeMode ? "remove-mode" : ""} ${makeDirtyMode ? "dirty-mode" : ""}`}
            onClick={() => {
              if (selectingOutfit) handleSelectOutfitItem(category, index);
              if (removeMode) {
                handleRemoveClothing(category, index);
              } else if (makeDirtyMode) {
                handleMakeClothingDirty(category, index);
              }
            }}
            style={{ position: "relative", cursor: selectingOutfit || makeDirtyMode || removeMode ? "pointer" : "default"}}
            onMouseEnter={(e) => e.currentTarget.querySelector(".description").style.display = "block"}
            onMouseLeave={(e) => e.currentTarget.querySelector(".description").style.display = "none"}
          >
            <div
              className="icon"
              style={{
                backgroundColor: item.color,
                maskImage: `url(${item.icon})`,
                WebkitMaskImage: `url(${item.icon})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                width: '50px', // Restored size
                height: '50px'
              }}
            ></div>
            <p
              className="description"
              style={{
                display: "none",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderIconOptions = (categoryIcons) => (
    <div className="icon-options">
      {categoryIcons.map((icon, index) => (
        <img
          key={index}
          src={icon}
          alt={`icon-${index}`}
          style={{
            width: "50px",
            height: "50px",
            margin: "5px",
            cursor: "pointer",
          }}
          onClick={() => setSelectedIcon(icon)}
        />
      ))}
    </div>
  );

  const toggleDropdown = (type) => {
    setShowDropdowns((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="container">
      {/* User Details Section */}
      <div className="user-details">
        <div className="user-info-box">
          <p>User: Abhiram Voleti</p>
          <br></br>
          <button className="logout-button" onClick={() => alert('Logging out...')}>Log Out</button>
        </div>
        <div className="feature-buttons">
          <button onClick={() => setShowAddClothingMenu(!showAddClothingMenu)}>Add Clothing</button>
          {showAddClothingMenu && (
            <div className="add-clothing-menu">
              <label>
                Type:
                <select
                  value={clothingType}
                  onChange={(e) => setClothingType(e.target.value)}
                >
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="accessories">Accessories</option>
                  <option value="shoes">Shoes</option>
                </select>
              </label>
              <br />
              <label>
                Color:
                <div className="color-options">
                  {["red", "blue", "green", "yellow", "black", "white", "orange", "purple", "pink", "gray", "saddlebrown", "skyblue", "tan"].map((color) => (
                    <div
                      key={color}
                      className="color-swatch"
                      style={{
                        backgroundColor: color,
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        border: "2px solid black",
                        display: "inline-block",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setClothingColor(color)}
                    />
                  ))}
                </div>
              </label>
              <br />
              <label>
                Icon:
                {renderIconOptions(
                  clothingType === "tops"
                    ? [tshirt, longsleeve, buttontee, buttonsleeve, tank, jacket, hoodie, sweater, zipper, puffer, coat, suit]
                    : clothingType === "bottoms"
                    ? [pants, trousers, shorts]
                    : clothingType === "accessories"
                    ? [beanie, cap, hat, necklace, scarf, sunglasses]
                    : [shoes]
                )}
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  placeholder="Brand or other details"
                  value={clothingDescription}
                  onChange={(e) => setClothingDescription(e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
              </label>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={handleAddClothing} style={{ width: "50%" }}>Add</button>
              </div>
            </div>
          )}
          <button onClick={() => {
              setRemoveMode(!removeMode);
              if (!removeMode) setMakeDirtyMode(false); // Disable make dirty mode
            }}
          >
            {removeMode ? "Done Removing" : "Remove Clothing"}
          </button>
          <button onClick={() => setSelectingOutfit(!selectingOutfit)}>{selectingOutfit ? "Cancel Selection" : "Select Matching Outfit"}</button>
          <button
            style={{ width: "150px", margin: "10px auto", display: "block" }}
            onClick={() => {
              if (!currentOutfit || Object.keys(currentOutfit).length === 0) return;
              setOutfits((prevOutfits) => [...prevOutfits, currentOutfit]);
              setCurrentOutfit(null); // Clear the current outfit
              setSelectingOutfit(false); // Exit selecting mode
            }}
          >
            Save Outfit
          </button>
          <button onClick={getRandomOutfit}>What Should I Wear Today?</button>
          {displayedOutfit && (
            <div className="selected-outfit">
              <h3>Your Outfit for Today</h3>
              {Object.keys(displayedOutfit).map((category) => (
                <div key={category} className="outfit-category">
                  <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                  <div className="outfit-items">
                    {displayedOutfit[category].map((item, index) => (
                      <div key={index} className="clothing-item">
                        <div
                          className="icon"
                          style={{
                            backgroundColor: item.color,
                            maskImage: `url(${item.icon})`,
                            WebkitMaskImage: `url(${item.icon})`,
                            maskSize: "contain",
                            WebkitMaskSize: "contain",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                            width: "50px",
                            height: "50px",
                          }}
                        ></div>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => {
              setMakeDirtyMode(!makeDirtyMode);
              if (!makeDirtyMode) setRemoveMode(false); // Disable remove mode
            }}
          >
            {makeDirtyMode ? "Done Marking" : "Mark Clothes Dirty"}
          </button>
          <button onClick={makeAllClothesClean}>Clean All Clothes</button>
        </div>
      </div>

      {/* Digital Closet Section */}
      <div className="closet">
        <div className="closet-title">
          {[...Array(5)].map((_, index) => (
            <img key={index} src={hanger} alt="hanger" style={{ width: "30px", marginRight: "5px" }} />
          ))}
          <span style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: 'black', display: 'inline-block' }}>My Closet</span>
          {[...Array(5)].map((_, index) => (
            <img key={index} src={hanger} alt="hanger" style={{ width: "30px", marginLeft: "5px" }} />
          ))}
        </div>
        <div className="dropdown">
          <button onClick={() => toggleDropdown('tops')}>Tops</button>
          {showDropdowns.tops && (
            <>
              <h3>Clean</h3>
              {renderClothingItems('tops', true)}
              <h3>Dirty</h3>
              {renderClothingItems('tops', false)}
            </>
          )}
        </div>
        <div className="dropdown">
          <button onClick={() => toggleDropdown('bottoms')}>Bottoms</button>
          {showDropdowns.bottoms && (
            <>
              <h3>Clean</h3>
              {renderClothingItems('bottoms', true)}
              <h3>Dirty</h3>
              {renderClothingItems('bottoms', false)}
            </>
          )}
        </div>
        <div className="dropdown">
          <button onClick={() => toggleDropdown('accessories')}>Accessories</button>
          {showDropdowns.accessories && (
            <>
              <h3>Clean</h3>
              {renderClothingItems('accessories', true)}
              <h3>Dirty</h3>
              {renderClothingItems('accessories', false)}
            </>
          )}
        </div>
        <div className="dropdown">
          <button onClick={() => toggleDropdown('shoes')}>Shoes</button>
          {showDropdowns.shoes && (
            <>
              <h3>Clean</h3>
              {renderClothingItems('shoes', true)}
              <h3>Dirty</h3>
              {renderClothingItems('shoes', false)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
