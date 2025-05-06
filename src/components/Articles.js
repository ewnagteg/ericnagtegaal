import React, { useEffect } from "react";
import Navbar from "./NavBar";
import Graph from "./Graph.js";
export default function Articles() {
    useEffect(() => {
        // Find all elements inside game boards
        document.querySelectorAll(".game-board").forEach((board) => {
            board.innerHTML = board.innerHTML
                .replace(/X/g, '<span style="color: red;">X</span>')
                .replace(/O/g, '<span style="color: orange;">O</span>');
        });
    }, []);
    return (
        <main className="text-gray-400 bg-gray-900 body-font">
            <Navbar />

            <div className="container px-5 py-10 mx-auto min-h-screen space-y-8">
                
                <section id="DQN" className="flex-1 pt-40">
                    <h2 className="text-lg font-bold text-white mb-2">
                        DQN with SNN
                    </h2>
                    <div>
                        I wanted to experiment with Spiking Neural Networks (SNNs) and thought it would be interesting to see how Deep Q-Networks (DQN) would perform. <br></br>

                        I first implemented DQN on the CartPole environment as a sanity check. A correct implementation should achieve decent results. From the graph, it's clear that the reward increases over episodes, suggesting that the SNN implementation behaves as expected. While 300 episodes isn't enough for DQN to fully converge, I kept training time short for efficiency—full training (10,000 episodes) would take significantly longer.<br></br>


                        A more interesting environment to try DQN on is Connect 4. DQN, in particular, is known to struggle with turn-based strategy games like Connect 4, as the reward is only provided at the end of the game.This makes it difficult for the algorithm to assign credit properly to earlier moves, which is critical for learning an effective strategy. Unlike games with frequent rewards (e.g., Atari games), Connect 4 requires long-term planning, which DQN isn't well-suited for. <br></br>


                        I used a gym from github since I liked the implementation and don't have time to do it myself. I probably will make one at some point, since for AlphaBetaI I want a faster implementation so I can achieve a greater depth. The actual network isn't anything sophisticated, just two linear layers and two leaky ones (these are a simplified 1st-order model from snntorch). The output is the membrane potential, this is arguably cheating but it worked. Hopefully I'll try with spike rate encoding when I have more time. To deal with illegal moves I just masked the policy network's output, I didn't bother with renormalizing but may try that some time.
                        <br></br>
                        <br></br>

                        My first experiment had the DQN play against a random ai. I did 1000 episodes (not a lot). The resulting network achieved a 85% win rate against a random ai. This isn't that impressive since the random AI can be cheesed easily. Connect 4 is a solved game, meaning that with perfect play, the first player can force a win in at most 41 moves. However, if both players play randomly, player 1 has about a 57% win rate simply due to first-move advantage (at least in my tests it did).
                        <br></br>
                        <br></br>

                        For fun, I've included a game for the DQN player so you can admire its tactical genius. As you can see, the DQN learned to cheese the random AI by spamming the same column. If its chosen column gets blocked, it simply picks another one and repeats the process. Against an AlphaBeta AI with depth limited to 5 it doesn't fair so well winning only 0% of time (despite starting on the better side). This makes sense because DQN is going to struggle with early game moves and long term planning. It turns out its naive strategy isn't so great against players that can think.
                        <br></br>
                        <br></br>

                        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto -mx-2">
                            <div className="p-2 sm:w-1/6 w-1/3">
                                <div className="game-board">
                                    .......<br></br>
                                    .......<br></br>
                                    .......<br></br>
                                    .......<br></br>
                                    .......<br></br>
                                    .....X.<br></br>
                                </div>
                            </div>
                            <div className="p-2 sm:w-1/6 w-1/3">
                                <div className="game-board">
                                    .......<br></br>
                                    .......<br></br>
                                    .......<br></br>
                                    .......<br></br>
                                    .....X.<br></br>
                                    ..O..X.<br></br>
                                </div>
                            </div>
                            <div className="p-2 sm:w-1/6 w-1/3">
                                <div className="game-board">
                                    .......<br></br>
                                    .......<br></br>
                                    .......<br></br>
                                    .....X.<br></br>
                                    .....X.<br></br>
                                    ..O.OX.<br></br>
                                </div>
                            </div>
                            <div className="p-2 sm:w-1/6 w-1/3">
                                <div className="game-board">
                                    .......<br></br>
                                    .......<br></br>
                                    .....X.<br></br>
                                    .....X.<br></br>
                                    ..O..X.<br></br>
                                    ..O.OX.<br></br>
                                </div>
                            </div>
                        </div>


                        To actually improve the AI you need to train it against a less naive opponent. You could train it against AlphaBeta opponent, but this is pretty pointless since it's cheating. The more interesting approach is to try training it against itself to see if it can improve itself. To do this I just made the target network choose moves (I didn't add that to memory at this point).
                        Easiest way is to use some MCST method to expand a search tree, backpropogate end states and use this as training data for the policy network.
                        I have the implementation for this but haven't got arround to finishing this yet (was working on other stuff that I may end up putting here).
                        <br></br>
                        <br></br>

                    </div>
                </section>

                <section id="3dgraph" className="flex-1 pt-40 pb-24">
                    <div className="pt-2 pb-3">
                        <Graph />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2">About 3D Graph</h2>
                    The 3D graph on the front page isn't anything too fancy -  it's just a bunch of &lt;div&gt;  elements, transformed into a 3D shape using CSS. I can make it display any arbitrary object by exporting a model from Blender as a Wavefront (.obj) file and pasting the text directly into the component. (Yeah, I could make this process a little more elegant, but it works.)
                    <br></br>
                    <br></br>
                    Honestly, I just thought it was funny that this is even possible with CSS - that's why I built it in the first place.
                    <br></br>
                    <br></br>
                    More specifically, it works by generating a bunch of &lt;div&gt; s, setting their background color, and using translate3d along with rotateX, rotateY, and rotateZ to position and orient them correctly. It's not particularly difficult — just requires some basic linear algebra to figure out the right angles.
                    <br></br>
                    <br></br>
                    I also experimented with trying to render full triangles instead of just drawing edges. This turned out to be much harder. The main challenge was creating &lt;div&gt;  elements that could match an arbitrary face shape. Since native JavaScript and CSS don't really support arbitrary 3D polygon shapes, I had to write my own code to generate them.
                    <br></br>
                    <br></br>
                    To do this, I ended up calculating custom basis vectors for each face. One basis vector lies in the XZ plane, and the second is obtained by taking the cross product between the first vector and the face's normal. Using these, I transform the vertices into a local "barycentric" space. After bounding and normalizing these vectors, I create a CSS clip-path polygon that clips a div into the correct triangle shape. From there, it's just a matter of transforming and rotating the div into position.
                    <br></br>
                    <br></br>
                    Unfortunately, the result is still slightly off, so there's probably a small mistake somewhere in my math. Regardless, I found the process pretty interesting.

                </section>


            </div>
        </main>
    )
};