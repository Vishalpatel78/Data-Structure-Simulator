// Stack Class
class Stack {
    constructor() {
        this.elements = [];
    }

    push(value) {
        this.elements.push(value);
        this.render();
    }

    pop() {
        if (this.elements.length) {
            this.elements.pop();
            this.render();
        }
    }

    render() {
        const stackVisualization = document.getElementById("stack-container");
        stackVisualization.innerHTML = '';
        this.elements.forEach((value, index) => {
            const newElement = document.createElement("div");
            newElement.className = "stack-element";
            if (index === this.elements.length - 1) {
                newElement.classList.add("new-stack-element"); // Different color for new element
            }
            newElement.innerText = value;
            stackVisualization.appendChild(newElement);
        });
    }
}

// Queue Class
class Queue {
    constructor() {
        this.elements = [];
    }

    enqueue(value) {
        this.elements.push(value);
        this.render();
    }

    dequeue() {
        if (this.elements.length) {
            this.elements.shift();
            this.render();
        }
    }

    render() {
        const queueVisualization = document.getElementById("queue-container");
        queueVisualization.innerHTML = '';
        this.elements.forEach(value => {
            const newElement = document.createElement("div");
            newElement.className = "queue-element";
            newElement.innerText = value;
            queueVisualization.appendChild(newElement);
        });
    }
}

// Linked List Class
class LinkedList {
    constructor() {
        this.head = null;
    }

    add(value) {
        const newNode = { value, next: null };
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.render();
    }

    render() {
        const linkedListContainer = document.getElementById("linkedlist-elements");
        linkedListContainer.innerHTML = '';
        let current = this.head;
        while (current) {
            const newElement = document.createElement("div");
            newElement.className = "linkedlist-element";
            newElement.innerText = current.value;
            linkedListContainer.appendChild(newElement);
            current = current.next;
        }
    }
}

// Binary Tree Class
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
        this.render();
    }

    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    render() {
        const treeContainer = document.getElementById("tree-elements");
        treeContainer.innerHTML = '';
        this._renderNode(this.root, treeContainer, 300, 50, 150, 0);
    }

    _renderNode(node, container, x, y, offset, level) {
        if (node) {
            const nodeElement = document.createElement("div");
            nodeElement.className = `tree-node level-${level % 4}`;
            nodeElement.innerText = node.value;
            nodeElement.style.left = `${x}px`;
            nodeElement.style.top = `${y}px`;
            nodeElement.style.position = "absolute";
            container.appendChild(nodeElement);

            // Draw lines to children nodes
            if (node.left) {
                this._drawLine(container, x, y, x - offset, y + 50);
                this._renderNode(node.left, container, x - offset, y + 50, offset / 2, level + 1);
            }
            if (node.right) {
                this._drawLine(container, x, y, x + offset, y + 50);
                this._renderNode(node.right, container, x + offset, y + 50, offset / 2, level + 1);
            }
        }
    }

    _drawLine(container, x1, y1, x2, y2) {
        const line = document.createElement("div");
        line.className = "arrow";
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0';
        line.style.position = 'absolute';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.height = '2px';
        line.style.backgroundColor = 'black';
        container.appendChild(line);
    }
}

// Initialize data structures
const stack = new Stack();
const queue = new Queue();
const linkedList = new LinkedList();
const binaryTree = new BinaryTree();

// Event listeners for stack
document.getElementById("push-btn")?.addEventListener("click", () => {
    const value = document.getElementById("stack-input").value;
    if (value) {
        stack.push(value);
        document.getElementById("stack-input").value = '';
    }
});
document.getElementById("pop-btn")?.addEventListener("click", () => stack.pop());

// Event listeners for queue
document.getElementById("enqueue-btn")?.addEventListener("click", () => {
    const value = document.getElementById("queue-input").value;
    if (value) {
        queue.enqueue(value);
        document.getElementById("queue-input").value = '';
    }
});
document.getElementById("dequeue-btn")?.addEventListener("click", () => queue.dequeue());

// Event listeners for linked list
document.getElementById("add-to-list-btn")?.addEventListener("click", () => {
    const value = document.getElementById("linkedlist-input").value;
    if (value) {
        linkedList.add(value);
        document.getElementById("linkedlist-input").value = '';
    }
});

// Event listeners for binary tree
document.getElementById("add-to-tree-btn")?.addEventListener("click", () => {
    const value = document.getElementById("tree-input").value;
    if (value) {
        binaryTree.insert(value);
        document.getElementById("tree-input").value = '';
    }
});
